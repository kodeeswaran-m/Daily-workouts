import { useEffect, useState } from "react";


function useFetch(url) {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetch(url)
            .then((res) => res.json())
            .then((ele) => {
                if (isMounted) {
                    setError(null);
                    setData(ele);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => { isMounted = false; };
    }, [url]);

    return { data, error, loading };
}

export default useFetch;