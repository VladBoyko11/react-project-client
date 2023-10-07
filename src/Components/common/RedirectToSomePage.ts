import { useNavigate } from "react-router-dom"

const redirectToSomePage = (redirectPath: string, {replace}: {replace: boolean} = {replace: true}) =>{
    const navigate = useNavigate()
    navigate(redirectPath, {replace})
}

export default redirectToSomePage