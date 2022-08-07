import iconMoney from './../assets/icon-money.png'

export function FeatureMoney() {
    return (
        <div class="feature-item">
            <img
                src={iconMoney}
                alt="Chat Icon"
                class="feature-icon"
            />
            <h3 class="feature-item-title">More savings means higher rates</h3>
            <p>
                The more you save with us, the higher your interest rate will be!
            </p>
        </div>
    )
}