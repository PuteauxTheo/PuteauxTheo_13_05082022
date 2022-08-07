import Header from '../components/Header.jsx'
import  Banner from '../components/Banner.jsx'
import { FeatureChat } from '../components/FeatureChat.jsx'
import { FeatureMoney } from '../components/FeatureMoney.jsx'
import { FeatureSecurity } from '../components/FeatureSecurity.jsx'
import { Footer } from '../components/Footer.jsx'

export default function Home(){
    return (
        <body>
            <Header />
            <main className="main bg-dark">
                <Banner />
                <sections className="features">
                    <h2 className="sr-only">Features</h2>
                    <FeatureChat />
                    <FeatureMoney />
                    <FeatureSecurity />
                </sections>
            </main>
            <Footer />
        </body>
    )
}