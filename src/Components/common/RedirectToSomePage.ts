import { useNavigate } from "react-router-dom"

const useRedirectToSomePage = (redirectPath: string, {replace}: {replace: boolean} = {replace: true}) =>{
    const navigate = useNavigate()
    navigate(redirectPath, {replace})
}

export default useRedirectToSomePage