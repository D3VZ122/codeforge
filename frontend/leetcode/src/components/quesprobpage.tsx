import { Link } from "react-router-dom"


interface Quespage{
    id: string
    ques: string
    difficulty: string

}

export default function Quesprobpage({id, ques, difficulty}: Quespage){
   
    return (
        <>
            <Link to={"/problem/"+id}>
                <div className="bg-gray-100 rounded-lg p-2 m-2 text-xs h-40 flex flex-col justify-between ">
                    <div>
                        <h3 className="text-lg font-medium mb-2">{ques}</h3>
                    </div>
                    <div className="flex justify-between">
                        <span className={difficulty=="EASY"?"text-gray-500":difficulty=="MEDIUM"?"text-yellow-400":"text-red-700"}>{difficulty}</span>
                        <button className="bg-black text-sm text-white rounded-md p-2">Solve</button>
                    </div>
                </div>
            </Link>
        </>
    )
}

