import { useState } from "react";

export function useUpdate(){
    const [state, setState] = useState({});
    return ()=>setState({});
}