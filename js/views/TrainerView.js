export default class TrainerView {

    render(trainer) {

        return `

            <h2>👤 Trainer</h2>

            <hr>

            <p><strong>Nome:</strong> ${trainer.getName()}</p>

            <p><strong>Trainer ID:</strong> ${trainer.getTrainerId()}</p>

            <p><strong>Secret ID:</strong> ${trainer.getSecretId()}</p>

            <p><strong>Dinheiro:</strong> ₽ ${trainer.getMoney()}</p>

            <p><strong>Tempo:</strong> ${trainer.getPlayTime()}</p>

        `;

    }

}
