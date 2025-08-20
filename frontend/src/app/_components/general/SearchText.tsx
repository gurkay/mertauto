import { getAraclar } from "@/app/lib/features/araclar/araclarCreateAsyncThunk";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ButtonEkle from "@/app/_components/general/ButtonEkle";
import { useEffect, useState } from "react";
import { setMySearchText } from "@/app/lib/features/araclar/araclarSlice";
import { getStoklar } from "@/app/lib/features/stoklar/stoklarCreateAsyncThunk";
import { getIsEmirleri } from "@/app/lib/features/isEmirleri/isEmirleriCreateAsyncThunk";

interface IProps {
    page: number;
    placeholder: string;
    searchTable: string;
}

// Define an interface for search params
interface SearchParams {
    keyword: string;
    [key: string]: any;
}

export default function SearchText({ page, placeholder, searchTable }: IProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { araclar, loading, status, responseMessage, mySearchText: araclarMySearchText } = useSelector((state: RootState) => state.araclarReducer); 
    const { stoklar, loading: stoklarLoading, status: stoklarStatus, responseMessage: stoklarResponseMessage, mySearchText: stoklarMySearchText } = useSelector((state: RootState) => state.stoklarReducer); 
    const { isEmirleri, loading: isEmirleriLoading, status: isEmirleriStatus, responseMessage: isEmirleriResponseMessage, mySearchText: isEmirleriMySearchText } = useSelector((state: RootState) => state.isEmirleriReducer); 
    
    const [searchTextValue, setSearchTextValue] = useState("");

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTextValue(value);

        if (searchTable === "araclar") {
            dispatch(getAraclar({ pageNum: page, sortField: "model", sortDir: "desc", keyword: value }));
            
            // Create a new search params object
            const newSearchText: SearchParams = { keyword: value };
            
            // Only add other properties if araclarMySearchText is an object
            if (araclarMySearchText && typeof araclarMySearchText === 'object') {
                Object.entries(araclarMySearchText).forEach(([key, val]) => {
                    if (key !== 'keyword') {
                        newSearchText[key] = val;
                    }
                });
            }
            
            dispatch(setMySearchText(newSearchText));
        } else if (searchTable === "isEmirleri") {
            dispatch(getIsEmirleri({ pageNum: page, sortField: "isEmirNo", sortDir: "desc", keyword: value }));
            dispatch(setMySearchText(value));
        } else if (searchTable === "stoklar") {
            dispatch(getStoklar({ pageNum: page, sortField: "stokAdi", sortDir: "desc", keyword: value }));
            dispatch(setMySearchText(value));
        }
    }

    useEffect(() => {
        if (searchTable === "stoklar" && stoklarMySearchText) {
            setSearchTextValue(typeof stoklarMySearchText === 'string' ? stoklarMySearchText : '');
        } else if (searchTable === "araclar" && araclarMySearchText) {
            if (typeof araclarMySearchText === 'object' && araclarMySearchText !== null) {
                // Access keyword safely using optional chaining
                setSearchTextValue((araclarMySearchText as any)?.keyword || '');
            } else if (typeof araclarMySearchText === 'string') {
                setSearchTextValue(araclarMySearchText);
            }
        } else if (searchTable === "isEmirleri" && isEmirleriMySearchText) {
            setSearchTextValue(typeof isEmirleriMySearchText === 'string' ? isEmirleriMySearchText : '');
        }
    }, [searchTable, stoklarMySearchText, araclarMySearchText, isEmirleriMySearchText]);

    return (
        <div className="p-4 border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        id="searchText"
                        placeholder={placeholder}
                        className={`text-black w-full px-8 py-2 border rounded-md border-gray-300`}
                        value={searchTextValue}
                        onChange={handleChangeText}
                    />
                </div>
            </div>
        </div>
    );
}