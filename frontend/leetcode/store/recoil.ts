import {atom} from "recoil"

export const problempage = atom({
    key:"problem",
    default:[]
})

export const isauthenticated = atom({
    key:"auth",
    default:false
})