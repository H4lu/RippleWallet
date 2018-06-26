import  React from 'react'
import { getRippleBalance, createTransaction, connectToRipple } from '../API/cryptocurrencyAPI/Ripple'
import { getAddress } from '../API/hardwareAPI/Hardware'

export default class App extends React.Component<any, any> {
    sourceAddress = 2
    destinationAdress = 4
    constructor(props: any) {
        super(props)
        this.transaction = this.transaction.bind(this)
    }
    componentDidMount() {
        getAddress(6)
        connectToRipple().then(getRippleBalance)
    }
    transaction() {
        createTransaction('rUvMvtseXY45ju5TrL7ebvwGsKhMFMWggR',0.002)
    }
    render() {
        return (
            <div>
                <p>Hello!</p>
                <button onClick = {this.transaction}></button>
            </div>
        )
    }

}
