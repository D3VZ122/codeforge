import  Cookies  from "js-cookie"




export default function Home(){
    const cookie= Cookies.get('token');
    console.log(cookie);
    return (<>
    {cookie}
        Home System
    </>)
}