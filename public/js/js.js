window.onload = function () {

    pegarImagensJson();
    const alertD = document.getElementById('alertD');
    const alertS = document.getElementById('alertS');
    const pDanger = document.getElementById('pDanger');
    const pSuc = document.getElementById('pSuc');
    const spiner = document.getElementById('spiner');
    alertD.style.display = 'none';
    alertS.style.display = 'none';
    spiner.style.display = 'none';

    let invervalo;
    const form = document.querySelector('form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const inImg = this.inImg.value;

        if (inImg.trim() == "") {
            alertD.style.display = 'block';
            pDanger.textContent = "Insira uma imagem!";
            setTimeout(() => {
                alertD.style.display = 'none';
            }, 5000);
            return;
        }

        const formData = new FormData(this);

        spiner.style.display = 'block';
        const requisicao = await fetch('http://localhost:8000/dados.php', {
            method: 'post',
            mode: 'cors',
            body: formData
        });

        const resposta = await requisicao.json();
        spiner.style.display = 'none';


        if (resposta.status != 200) {
            alertD.style.display = 'block';
            pDanger.textContent = "Não foi possível fazer o uploud da imagem!";
            setTimeout(() => {
                alertD.style.display = 'none';
            }, 5000);
            return;
        }

        alertS.style.display = 'block';
        pSuc.textContent = "Uploud feito com sucesso!";
        setTimeout(() => {
            alertS.style.display = 'none';
        }, 5000);
        clearInterval(invervalo);
        pegarImagensJson();
    });

    const divImagens = document.getElementById('divImagens');

    function mostrarImagens(dados) {
        document.getElementById('semImg').style.display = 'none';
        let cont = 0;
        const imgDados = [];

        dados.forEach(valor => {
            imgDados.push(valor.imagem);
        });

        console.log(imgDados);

        divImagens.style = `background: url(img/${imgDados[cont]})no-repeat; background-size: cover; background-position: center`;
        console.log(cont, imgDados[cont]);

        invervalo = setInterval(() => {
            cont + 1 < imgDados.length ? cont++ : cont = 0;
            console.log(cont, imgDados[cont]);
            divImagens.style = `background: url(img/${imgDados[cont]}) no-repeat; background-size: cover; background-position: center`;
        }, 5000);
    }

    async function pegarImagensJson() {
        try {
            const requisicao = await fetch('../json/imagens.json');
            const dados = await requisicao.json();

            if (dados == undefined) return;

            const arrayDados = Object.keys(dados).map(i => dados[i]);
            mostrarImagens(arrayDados);
        }
        catch (e) {
            alertD.style.display = 'block';
            pDanger.textContent = "Ainda não possui imagens!";
            setTimeout(() => {
                alertD.style.display = 'none'
            }, 5000);
        }
    }


}