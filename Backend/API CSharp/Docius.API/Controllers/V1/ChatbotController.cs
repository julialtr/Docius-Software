using Asp.Versioning;
using AutoMapper;
using Docius.Service.EntityService;
using Microsoft.AspNetCore.Mvc;
using Docius.Repository.ServicosTerceiros.Dados;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class ChatbotController : ControllerBase
{
    private readonly ChatbotEntityService _chatbotEntityService;

    public ChatbotController(IMapper mapper, ChatbotEntityService chatbotEntityService) : base(mapper)
    {
        _chatbotEntityService = chatbotEntityService;
    }

    [HttpPost("thread")]
    [ProducesResponseType(typeof(object), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateThread()
    {
        var threadId = await _chatbotEntityService.CriaThread();

        return Ok(new { response = threadId });
    }

    [HttpPost("thread/validacao/{id}")]
    [ProducesResponseType(typeof(object), StatusCodes.Status201Created)]
    public async Task<IActionResult> ValidadeThread(string id)
    {
        var threadId = await _chatbotEntityService.ValidaThread(id);

        return Ok(new { response = threadId });
    }

    [HttpPost]
    [ProducesResponseType(typeof(ReadMensagem[]), StatusCodes.Status201Created)]
    public async Task<IActionResult> SendMessage([FromBody] CreateMensagemDto dadosDto)
    {
        var mensagens = await _chatbotEntityService.SendMessage(Mapper.Map<CreateMensagem>(dadosDto));

        return Ok(new { response = mensagens });
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ReadMensagem[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMessages(string id)
    {
        var mensagens = await _chatbotEntityService.GetMessages(id);

        return Ok(new { response = mensagens });
    }

    [HttpDelete("thread/{id}")]
    public async Task<IActionResult> DeleteThread(string id)
    {
        await _chatbotEntityService.DeletaThread(id);

        return Ok();
    }
}
