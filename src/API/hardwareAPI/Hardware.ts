import * as ref from 'ref'
import * as ffi from 'ffi'
import { Buffer } from 'buffer'

const Lib = ffi.Library('ripple', {'get_address': ['void', ['int','int*','string','string','string']], 'get_sign': ['void',['int','string','string','int*']]})

export function getSignature(id: number, hash: Buffer): Buffer {
    let sign: Buffer = new Buffer(280)
    let lengthSign: Buffer = ref.alloc('int')
    let errorCode = Lib.get_sign(id, hash, sign, lengthSign)
    console.log('GOT THIS SIGNATURE',sign.toString('hex'))
    console.log('SIGNATURE LENGTH', lengthSign.readInt32LE(0))
    console.log('SLICED SIG',sign.slice(0, lengthSign.readInt32LE(0)))
    return sign.slice(0, lengthSign.readInt32LE(0))
}

export function getAddress(id: number): string {
    let addressBuf: Buffer = new Buffer(50)
    let privKeyBuf: Buffer = new Buffer(50)
    let pubKeyBuf: Buffer = new Buffer(50)
    let lenAddress = ref.alloc('int')
    console.log('CALLING GET ADDRESS')
    let errorcode = Lib.get_address(id, lenAddress, addressBuf, privKeyBuf, pubKeyBuf)
    console.log('Error code', errorcode)
    console.log('Address length', lenAddress.toString(), lenAddress.toString('hex'))
    console.log('Address', addressBuf, addressBuf.toString())
    console.log('Privkey', privKeyBuf.toString('hex'))
    console.log('Pubkey', pubKeyBuf.toString('hex'))
    return addressBuf.toString()
}
