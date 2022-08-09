import iconMoney from './../assets/icon-money.png'

export function FeatureMoney() {
    return (
        <div className="feature-item">
            <img src={iconMoney} alt="Chat Icon" className="feature-icon"/>
            <h3 className="feature-item-title">More savings means higher rates</h3>
            <p>
                The more you save with us, the higher your interest rate will be!
            </p>
        </div>
    )
}