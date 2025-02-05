from flask import Flask, jsonify, request

from scraping.scrapingBase import scraping

app = Flask(__name__)

@app.route("/get-produtos", methods=["GET"])
def get_produtos():
    ids_mercados = request.args.get('ids_mercados')

    if ids_mercados:
        ids_mercados = ids_mercados.split(',')
        ids_mercados = [int(id) for id in ids_mercados]
    else:
        return jsonify({
            "mensagem": "Campo ids_mercados não foi informado.",
            "dados": None
        }), 400
    
    texto_pesquisa = request.args.get('texto_pesquisa')

    if texto_pesquisa == None:
        return jsonify({
            "mensagem": "Campo texto_pesquisa nao foi informado.",
            "dados": None
        }), 400

    produtos, httpResult = scraping(ids_mercados, texto_pesquisa)

    return jsonify({
        "mensagem": "",
        "dados": produtos
    }), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
