using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;

namespace Docius.Service.EntityService;

public sealed class EmailEntityService
{
    private readonly IConfiguration _configuration;

    public EmailEntityService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    private MimeMessage ConfigureMimeMessage(List<string> receivers, string subject)
    {
        MimeMessage mimeMessage = new()
        {
            Subject = subject
        };

        mimeMessage.From.Add(InternetAddress.Parse(_configuration["EmailConfiguration:User"]));

        foreach (var receiver in receivers)
            mimeMessage.To.Add(InternetAddress.Parse(receiver));

        return mimeMessage;
    }

    private MimeMessage GetMimeMessage(string email, string empresa, string codigo)
    {
        BodyBuilder bodyBuilder = new();

        try
        {
            string htmlEmailContent = File.ReadAllText(Path.Combine("Template", "EmailTemplate.html"));
            bodyBuilder.HtmlBody = htmlEmailContent.Replace("{{codigo}}", codigo)
                                                   .Replace("{{link}}", string.Format(_configuration["Urls:VerificacaoCodigoFrontend"], empresa, codigo));
        }
        catch (Exception e)
        {
            throw new Exception(string.Format("Ocorreu um erro durante a leitura do modelo de e-mail de envio de token: {0}", e.Message));
        }

        var mimeMessage = ConfigureMimeMessage(new() { email }, "Redefinição de Senha");
        mimeMessage.Body = bodyBuilder.ToMessageBody();
        return mimeMessage;
    }

    public async Task SendMailAsync(string email, string empresa, string codigo)
    {
        using SmtpClient smtp = new();

        IConfiguration mailServiceConfiguration = _configuration.GetSection("EmailConfiguration");

        string user = mailServiceConfiguration["User"];
        string password = mailServiceConfiguration["Password"];
        string mailServer = mailServiceConfiguration["Server"];
        int mailServerPort = Convert.ToInt32(mailServiceConfiguration["Port"]);

        smtp.Connect(mailServer, mailServerPort);
        smtp.Authenticate(user, password);

        await smtp.SendAsync(GetMimeMessage(email, empresa, codigo));
    }
}
