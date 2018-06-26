import { RippleAPI } from 'ripple-lib'
import { getAddress, getSignature } from '../hardwareAPI/Hardware'
import { sha512 } from 'hash.js'
import * as binary from 'ripple-binary-codec'
import * as crypto from 'crypto'
import * as keypairs from 'ripple-keypairs'
// import  * as BN from 'bn.js'
const BN = require('bn.js');

console.log('BN', BN)
declare global {
    interface Window {
        ripple
    }
}

// let address = 'rB9AWyzAJQ7DwVTvLmAe5XjtUKExxogAkV'
let address = 'rB9AWyzAJQ7DwVTvLmAe5XjtUKExxogAkV'
const sourceNumber = 6
const Ripple = new window.ripple.RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'})
let pubkey = '0223254fe57496571e79d92c69f3a9e928e5b2e045a237752166801336084f5b38'
export function initRippleAddress() {

}

export function connectToRipple() {
    return new Promise((resolve, reject) => {
        Ripple.connect().then(() => {
            console.log('CONNECTED')
            resolve()
        }).catch((err) => {
            console.log('Error during connection',  err)
            reject(err)
        })
    })
}

export async function getRippleBalance() {
    return new Promise(async (resolve) => {
        console.log(window.ripple)
        let balance = await Ripple.getBalances(address)
        console.log('GOT THIS BALANCE', balance)
        console.log(JSON.stringify(balance,null,2))
        resolve(JSON.stringify(balance,null,2))
    })
}

export function createTransaction(paymentAddress: string, amount: number) {
    console.log('INSIDE CREATE')
    let payment = {
        source: {
            address: address,
            maxAmount : {
                value: '5',
                currency: 'XRP'
            }
        },
        destination: {
            address: paymentAddress,
            amount: {
                value: '5',
                currency: 'XRP'
            }
        }
    }
    let instructions = {
        maxLedgerVersionOffset: 5
    }

    Ripple.preparePayment(address, payment, instructions).then(prepared => {
        console.log('RIPPLE OBJECT', Ripple)
        console.log('Payment transaction prepared', prepared.txJSON, prepared)  
        console.log('ENCODED', binary.encode(JSON.parse(prepared.txJSON)))
        console.log('FOR SIGNING', binary.encodeForSigning(JSON.parse(prepared.txJSON)))
        let tx = JSON.parse(prepared.txJSON)
        tx.SigningPubKey = pubkey.toUpperCase()
        let signingData = binary.encodeForSigning(tx)

        let bytes = hexToBytes(signingData)
        console.log('BYTES', bytes)
        console.log('BUFFER', Buffer.from(signingData, 'hex'))
        console.log('MY SIGNED DATA', signingData)
        console.log('MY HASH', crypto.createHash('sha512').update(Buffer.from(signingData, 'hex')).digest().slice(0,32))
        let cryptoHash = crypto.createHash('sha512').update(Buffer.from(signingData, 'hex')).digest().slice(0,32)
        let hashForSig = sha512().update(bytes).digest()
        console.log('Hash for sig', sha512().update(bytes).digest())
        console.log(hashForSig, typeof(hashForSig))
        const { signedTransaction } = Ripple.sign(prepared.txJSON, 'saBcAo6XXRx84PYWGNrdkHvgFZWSh')
        console.log('Signed transaction', signedTransaction)
        console.log('Decoded', binary.decode(signedTransaction))
        console.log('CRYPTOHASH', cryptoHash)
        let sig = getSignature(6, cryptoHash)
        // console.log(keypairs.sign(new Buffer(prepared.txJSON).toString('hex'),'fb9345b069ba185ec2028206d0ddfd64f0634123acd83ca1ad843a6f23c7be840'))
        // console.log('SLICED', sig.slice(2, sig.length - 35).toString('hex').toUpperCase())
        console.log('SLICED', sig.toString('hex').toUpperCase())
        // console.log('Verify', keypairs.verify(prepared.txJSON,sig.slice(2,sig.length-35).toString('hex'), pubkey.toUpperCase() ))
        // console.log('Verify lib', keypairs.verify(binary.encode(JSON.parse(prepared.txJSON)),binary.decode(signedTransaction).TxnSignature,binary.decode(signedTransaction).SigningPubKey))
        // console.log('Verify lib', keypairs.verify(binary.encode(JSON.parse(prepared.txJSON)),binary.decode(signedTransaction).TxnSignature,pubkey))
        console.log(keypairs.deriveAddress(pubkey))
        console.log(keypairs.deriveAddress(binary.decode(signedTransaction).SigningPubKey))
        // tx.TxnSignature = sig.slice(2, sig.length - 35).toString('hex').toUpperCase()
        tx.TxnSignature = sig.toString('hex').toUpperCase()
        console.log('Tx after insert', tx)
        let bin = binary.encode(tx)
        console.log('My bin', bin)
        Ripple.submit(bin).then((res, err) => {
            console.log('Error in submit', err)
            console.log('Response of submit', res)
        })
    }).catch(err => {
        console.log('Error during preparing transaction', err)
    })
    console.log(payment)
}

function hexToBytes(a) {
    return  new BN(a, 16).toArray(null, a.length / 2);
}
// 12000022800000002400000003201B009D422A614000000005F5E10068400000000000000C732102DBE864146F9024D20B1948031D2E1DCC1C1C1DAACA172703F4D4FA7EB72F585174473045022100A7E616C22FF3ACD0580A1A8C5A6C3AAA525DEA6865A0C1EB0DEB0E30C219378002204EF07BCA61435E7698DF5DC518E9EEB1FFC1E59948C360BD9FBBC00B4FC4D97081146F62180F6636E35307953A44E0D61BECF32BCC93831482C0E674B6450F7AD33B24AC89F127687843011B
// 12000022800000002400000003201B009D422A614000000005F5E10068400000000000000C73210223254FE57496571E79D92C69F3A9E928E5B2E045A237752166801336084F5B387446304402200DB5D2F87D7CA2298534C7D83E074DB4DD7A97482C837CEEB05F97176CADEFDF02207FFE5A4A0FB71583D223E3E95D483F41EBAB166EF04717CE11FEB17AAFE22DED81146F62180F6636E35307953A44E0D61BECF32BCC93831482C0E674B6450F7AD33B24AC89F127687843011B
// 5354580012000022800000002400000001201B009D90C36140000000000F424068400000000000000C73210223254FE57496571E79D92C69F3A9E928E5B2E045A237752166801336084F5B38811456D4D9A220C51B290E00A15B5019D589C11C5D64831482C0E674B6450F7AD33B24AC89F127687843011B
// 5354580012000022800000002400000001201B009D90C36140000000000F424068400000000000000C732102DBE864146F9024D20B1948031D2E1DCC1C1C1DAACA172703F4D4FA7EB72F5851811456D4D9A220C51B290E00A15B5019D589C11C5D64831482C0E674B6450F7AD33B24AC89F127687843011B
//12000022800000002400000004201B009D94716140000000000F424068400000000000000C73210223254FE57496571E79D92C69F3A9E928E5B2E045A237752166801336084F5B3874463044022009E5DABA48426210A916AC20B1E80864BFAE01B9A3FE3CB2CB17F874BB7F327C02200D93760E67774C7C48E29BB0A26BB1AE355A34BA0137F9F13007200FB42B648D81146F62180F6636E35307953A44E0D61BECF32BCC93831482C0E674B6450F7AD33B24AC89F127687843011B
//12000022800000002400000004201B009D94716140000000000F424068400000000000000C73210223254FE57496571E79D92C69F3A9E928E5B2E045A237752166801336084F5B3874473045022100B0E49BDB83BBAB7211A3E1C66B8556A2B688748B4D152855CAF5276D39C86DC802205CDA156C6B26357B7869A6576FDDDC289EB0757A87FF1B65E5BAED55090D90FA81146F62180F6636E35307953A44E0D61BECF32BCC93831482C0E674B6450F7AD33B24AC89F127687843011B