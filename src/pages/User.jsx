import { Footer } from "../components/Footer"
import Header from "../components/Header"
import Transaction from "../components/Transaction"

export default function User() {
    return (
        <div>
            <Header />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />Tony Jarvis!</h1>
                    <button className="edit-button">Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <Transaction/>
            </main>
            <Footer />
        </div>
    )
}