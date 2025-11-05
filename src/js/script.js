var itens = 0
var valorTotal = 0;
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
    document.getElementById('total').textContent = valorTotal;
}
async function adicionar(i) {
    var api = await fetch('https://fakestoreapi.com/products').then((Response) => Response.json());
    console.log(`${api[i].price}`);
    valorTotal += api[i].price;
    itens++;
    document.getElementById('itens').textContent = itens;
    document.getElementById('total').textContent = valorTotal;
}
function cep(){
    document.getElementById('cep').style.display = 'block';
}
async function mostrarCEP(){
    let numero = document.getElementById('numero').value;
    let dados = document.getElementById('dado').value.replace("-", "");
    const cep = await fetch(`https://viacep.com.br/ws/${dados}/json/`).then((Response) => Response.json());
    document.getElementById('resultado').style.display = "block";
    document.getElementById('resultado').textContent = `Endereço encontrado: ${cep.logradouro} ${numero}, no bairro ${cep.bairro}`;
    document.getElementById('complemento').style.display = 'block';
}
function ocultarCEP() {
    document.getElementById('cep').style.display ='none';
}