import React, {useEffect, useReducer, useState} from 'react';
import axios from 'axios';
import payload from "../api";
/*
 * Hook for Debouncing
 * The goal behind it is to reduce overhead by preventing a function from being called several times in succession.
 * We only have the API call fire when user stops typing so that we aren't calling our API rapidly.
 *
 */
export const useDebounceInt = (valueToDebounce, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(valueToDebounce);

    //when searchValue changes the function useDebounce is called
    useEffect(() => {
        //set debouncedValue to value (passed in) after the specified delay
        const handler = setTimeout((e) => {
            setDebouncedValue(valueToDebounce);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [valueToDebounce]);

    return debouncedValue;
};

export const useDebounce = (searchValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(searchValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [searchValue]);

    return debouncedValue;
};

const dataReducer = (state, action) => {
    const result = action.payload;

    switch (action.type) {
        case 'INIT':
            return {...state, isLoading: true, isError: false};
        case 'FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: null,
                status: (result != null) ? parseInt(result.status) : null
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: result.data,
                totalRecords: parseInt(result.headers['x-total-count'])
            };
        case 'POST_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                status: parseInt(result.status)
            };
        case 'PUT_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                status: parseInt(result.status)
            };
        case 'DELETE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                status: parseInt(result.status)
            };

        default:
            return state;
    }
};

export const useGet = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);
    const [reload, setReload] = useState(false);

    const callApi = (newUrl, reloadCurrentUrl) => {
        setUrl(newUrl);
        setReload(reloadCurrentUrl);
    };

    const [state, dispatch] = useReducer(dataReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
        totalRecords: null,
        status: null
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({type: 'INIT'});

            try {
                const result = await axios.get(url, payload);

                if (!didCancel) {
                    dispatch({type: 'FETCH_SUCCESS', payload: result});
                }
            } catch (response) {
                const result = response["request"];
                if (!didCancel) {
                    dispatch({type: 'FAILURE', payload: result});
                }
            }
        };

        fetchData();
        return () => {
            didCancel = true;
        };
    }, [url, reload]);

    return [state, callApi];
};

export const usePut = (initialUrl, body) => {
    const [url, setUrl] = useState(initialUrl);
    const [reload, setReload] = useState(false);
    //const {dispatch: notificationReload} = useContext(NotificationContext);

    const callApi = (newUrl, reloadCurrentUrl) => {
        setUrl(newUrl);
        setReload(reloadCurrentUrl);
    };

    const [state, dispatch] = useReducer(dataReducer, {
        isLoading: false,
        isError: false,
        status: null
    });

    useEffect(() => {
        let didCancel = false;

        const putData = async (body) => {
            if (typeof body === "undefined") {
                body = null;
            }

            dispatch({type: 'INIT'});

            try {
                const result = await axios.put(url, body, payload);

                if (!didCancel) {
                    //notificationReload({type: "reload"});
                    dispatch({type: 'PUT_SUCCESS', payload: result});
                }
            } catch (response) {
                const result = response["request"];
                if (!didCancel) {
                    dispatch({type: 'FAILURE', payload: result});
                }
            }
        };

        putData(body);
        return () => {
            didCancel = true;
        };
    }, [url, reload]);

    return [state, callApi];
};

export const usePost = (initialUrl, body) => {
    //console.log("hook post")
    const [url, setUrl] = useState(initialUrl);
    const [reload, setReload] = useState(false);
    //const {dispatch: notificationReload} = useContext(NotificationContext);

    const callApi = (newUrl, reloadCurrentUrl) => {
        setUrl(newUrl);
        setReload(reloadCurrentUrl);
    };

    const [state, dispatch] = useReducer(dataReducer, {
        isLoading: false,
        isError: false,
        status: null
    });

    useEffect(() => {
        //console.log(body);
        if (typeof body === "undefined") {
            body = null;
        }

        let didCancel = false;

        const postData = async (body) => {
            dispatch({type: 'INIT'});

            try {
                console.log(body);
                const result = await axios.post(url, body, payload);

                if (!didCancel) {
                    setUrl(null);
                    dispatch({type: 'POST_SUCCESS', payload: result});
                }

            } catch (response) {
                const result = response["request"];
                if (!didCancel) {
                    dispatch({type: 'FAILURE', payload: result});
                }
            }
        };

        postData(body);
        return () => {
            didCancel = true;
        };
    }, [url, reload]);

    return [state, callApi];
};

export const useDelete = (initialUrl) => {
    const [url, setUrl] = useState(initialUrl);
    const [reload, setReload] = useState(false);
    //const {dispatch: notificationReload} = useContext(NotificationContext);

    const callApi = (newUrl, reloadCurrentUrl) => {
        setUrl(newUrl);
        setReload(reloadCurrentUrl);
    };

    const [state, dispatch] = useReducer(dataReducer, {
        isLoading: false,
        isError: false,
        status: null,
    });

    useEffect(() => {
        let didCancel = false;

        const deleteData = async () => {
            dispatch({type: 'INIT'});

            try {
                const result = await axios.delete(url, payload);
                if (!didCancel) {
                    //notificationReload({type: "reload"});
                    dispatch({type: 'DELETE_SUCCESS', payload: result});
                }
            } catch (response) {
                const result = response["request"];
                if (!didCancel) {
                    dispatch({type: 'FAILURE', payload: result});
                }
            }
        };

        deleteData();
        return () => {
            didCancel = true;
        };
    }, [url, reload]);

    return [state, callApi];
};