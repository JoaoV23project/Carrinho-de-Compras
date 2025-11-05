// Variáveis
var itens = 0
var valorTotal = 0;
// Função que exibe os itens no catálogo
async function produtos() {
    var api = await fetch('https://fakestoreapi.com/products').then((Response) => Response.json());
    for (var i = 0; i < 20; i++) {
        document.getElementById(`nome${i}`).textContent = api[i].title;
        document.getElementById(`descri${i}`).textContent = api[i].description;
        document.getElementById(`price${i}`).textContent = `R$${api[i].price}`;
        document.getElementById(`image${i}`).setAttribute('src', api[i].image);
        document.getElementById(`price${i}`).style.color = 'green';
    }
    document.getElementById('itens').textContent = itens;
    document.getElementById('total').textContent = valorTotal.toFixed(2);
}
// Função que adiciona os valores e quantidade de itens comprados
async function adicionar(i) {
    var api = await fetch('https://fakestoreapi.com/products').then((Response) => Response.json());
    console.log(`${api[i].price}`);
    valorTotal += api[i].price;
    itens++;
    document.getElementById('itens').textContent = itens;
    document.getElementById('total').textContent = valorTotal;
}
// Função que exibirá o mapa com a rota de entrega e ocultará os itens do catálogo
function exibirMapa() {
    document.getElementById('map').style.visibility = 'visible';
    document.getElementById('carrinho').style.visibility = 'hidden';
    document.getElementById('ocultar').style.visibility = 'visible';
    document.getElementById('exibir').style.visibility = 'hidden';
}
// Função que ocultará o mapa e exibirá os itens do catálogo
function ocultarMapa() {
    document.getElementById('map').style.visibility = 'hidden';
    document.getElementById('carrinho').style.visibility = 'visible';
    document.getElementById('ocultar').style.visibility = 'hidden';
    document.getElementById('exibir').style.visibility = 'visible';
}
// Função que ocultará a descrição de cada item
function esconderDesccricao(descri) {
    document.getElementById(descri).style.display = 'none';
}
// Função que exiirá a descrição de cada item
function exibirDescricao(descri) {
    document.getElementById(descri).style.display = 'block';
    setTimeout(esconderDesccricao, 1500, descri);
}
// Mapa
navigator.geolocation.getCurrentPosition(
    (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // Inicializando o mapa
        const map = L.map('map').setView([-10.9472, -37.0731], 10); // Coordenadas de exemplo

        // Adicionando camada base
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Obrigado por comprar no nosso site! Suas encomendas chegarão em breve!'
        }).addTo(map);

        // Adicionando rota
        L.Routing.control({
            waypoints: [
                L.latLng(-10.949901, -37.071014), // Ponto inicial
                L.latLng(latitude, longitude)  // Ponto final
            ],
            routeWhileDragging: true
        }).addTo(map);
    },
    (error) => {
        console.error("Erro ao obter localização:", error.message);
    }
);
