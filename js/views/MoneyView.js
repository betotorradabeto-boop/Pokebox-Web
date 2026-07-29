export default class MoneyView {

    render(trainer) {

        return `

            <h2>💰 Money</h2>

            <hr>

            <h1 style="font-size:48px;margin-top:20px;">

                ₽ ${trainer.getMoney().toLocaleString("pt-BR")}

            </h1>

            <p>

                O sistema de edição será implementado em breve.

            </p>

        `;

    }

}
