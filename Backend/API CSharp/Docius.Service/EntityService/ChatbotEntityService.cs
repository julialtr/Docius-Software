using System.Text;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace Docius.Service.EntityService;

public sealed class ChatbotEntityService
{
    private readonly IConfiguration _configuration;

    public ChatbotEntityService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    private HttpClient GetClient()
    {
        var client = new HttpClient();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _configuration["OpenAI:APIKey"]);
        client.DefaultRequestHeaders.Add("OpenAI-Beta", "assistants=v2");

        return client;
    }

    public async Task<string> CriaThread()
    {
        var client = GetClient();

        var response = await client.PostAsync("https://api.openai.com/v1/threads", null);
        var responseJson = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        var threadId = responseJson.RootElement.GetProperty("id").GetString();

        return threadId;
    }

    public async Task<List<ReadMensagem>> SendMessage(CreateMensagem dados)
    {
        var client = GetClient();

        var messageBody = new
        {
            role = "user",
            content = dados.Mensagem
        };

        await client.PostAsync($"https://api.openai.com/v1/threads/{dados.ThreadId}/messages",
            new StringContent(JsonSerializer.Serialize(messageBody), Encoding.UTF8, "application/json"));

        var runBody = new
        {
            assistant_id = _configuration["OpenAI:AssistantID"]
        };

        var response = await client.PostAsync($"https://api.openai.com/v1/threads/{dados.ThreadId}/runs",
            new StringContent(JsonSerializer.Serialize(runBody), Encoding.UTF8, "application/json"));

        var responseJson = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        var runId = responseJson.RootElement.GetProperty("id").GetString();

        string status = "queued";
        while (status != "completed")
        {
            await Task.Delay(1000);

            var runResponse = await client.GetAsync($"https://api.openai.com/v1/threads/{dados.ThreadId}/runs/{runId}");
            var runResponseJson = JsonDocument.Parse(await runResponse.Content.ReadAsStringAsync());
            status = runResponseJson.RootElement.GetProperty("status").GetString();
        }

        var messageResponse = await client.GetAsync($"https://api.openai.com/v1/threads/{dados.ThreadId}/messages");
        var messageResponseJson = JsonDocument.Parse(await messageResponse.Content.ReadAsStringAsync());

        var mensagens = messageResponseJson.RootElement
            .GetProperty("data")
            .EnumerateArray()
            .Select((mensagem, index) =>
            {
                var conteudo = mensagem.GetProperty("content")
                    .EnumerateArray()
                    .FirstOrDefault(c => c.GetProperty("type").GetString() == "text");

                var texto = conteudo.GetProperty("text").GetProperty("value").GetString();

                var textoFormatado = Regex.Replace(texto, "【.*?】", "");

                return new ReadMensagem
                {
                    Id = index + 1,
                    TipoAutor = mensagem.GetProperty("role").GetString(),
                    Mensagem = textoFormatado,
                    DataHora = DateTimeOffset.FromUnixTimeSeconds(mensagem.GetProperty("created_at").GetInt64()).ToLocalTime().DateTime
                };
            })
            .OrderBy(mensagem => mensagem.DataHora)
            .ToList();

        return mensagens;
    }

    public async Task<List<ReadMensagem>> GetMessages(string id)
    {
        var client = GetClient();

        var messageResponse = await client.GetAsync($"https://api.openai.com/v1/threads/{id}/messages");
        var messageResponseJson = JsonDocument.Parse(await messageResponse.Content.ReadAsStringAsync());

        var mensagens = messageResponseJson.RootElement
            .GetProperty("data")
            .EnumerateArray()
            .Select((mensagem, index) =>
            {
                var conteudo = mensagem.GetProperty("content")
                    .EnumerateArray()
                    .FirstOrDefault(c => c.GetProperty("type").GetString() == "text");

                var texto = conteudo.GetProperty("text").GetProperty("value").GetString();

                var textoFormatado = Regex.Replace(texto, "【.*?】", "");

                return new ReadMensagem
                {
                    Id = index + 1,
                    TipoAutor = mensagem.GetProperty("role").GetString(),
                    Mensagem = textoFormatado,
                    DataHora = DateTimeOffset.FromUnixTimeSeconds(mensagem.GetProperty("created_at").GetInt64()).ToLocalTime().DateTime
                };
            })
            .OrderBy(mensagem => mensagem.DataHora)
            .ToList();

        return mensagens;
    }

    public async Task DeletaThread(string id)
    {
        var client = GetClient();

        await client.DeleteAsync($"https://api.openai.com/v1/threads/{id}");
    }
}
