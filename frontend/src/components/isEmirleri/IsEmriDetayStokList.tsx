'use client';

import Pagination from '@/app/_components/Pagination';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/features/store';
import { getStoklar } from '@/app/lib/features/stoklar/stoklarCreateAsyncThunk';
import IsEmriDetayStokTable from './IsEmriDetayStokTable';
import SearchText from '@/app/_components/general/SearchText';
import { IsEmriContent, IsEmriDetayContent, StokContent } from '@/types/MyTypes.d';
import { setIsEmriDetaylar } from '@/app/lib/features/isEmirleri/isEmirleriSlice';

interface IProps {
    isEmri: IsEmriContent;
}

export default function StokList(props: IProps) {

    const dispatch = useDispatch<AppDispatch>();
    const { stoklar, loading, status, responseMessage, mySearchText } = useSelector((state: RootState) => state.stoklarReducer);
    const { isEmriDetaylar, loading: isEmriDetaylarLoading} = useSelector((state: RootState) => state.isEmirleriReducer);

    const handlePageChange = (newPage: number) => {
        dispatch(getStoklar({ pageNum: newPage , sortField: "stokAdi", sortDir: "desc", keyword: mySearchText }));
    };

    const handleStokEkle = (stok: StokContent) => {
        const radomId = Math.random();

        const isEmirleriDetayContent: IsEmriDetayContent = {
            id: Number(radomId.toFixed(6)),
            isEmri: props.isEmri ?? null,
            stok: stok,
            yapilanIslemAdi: "",
            birimFiyati: 0,
            miktar: 1,
        }
        const newIsEmriDetaylar = [...(isEmriDetaylar ?? []), isEmirleriDetayContent];
        dispatch(setIsEmriDetaylar(newIsEmriDetaylar));
    }

    return (
        <div className="bg-gray-50 py-2">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-4">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <SearchText
                        page={stoklar?.number ?? 0}
                        placeholder="Barkod No, Stok Markası, Stok Adı..."
                        searchTable="stoklar"
                    />
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Stoklar yükleniyor...</p>
                        </div>
                    ) : stoklar?.content.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600">Stok bulunamadı.</p>
                        </div>
                    ) : (
                        <IsEmriDetayStokTable 
                            isEmriDetaylar={isEmriDetaylar ?? []}
                            handleStokEkle={handleStokEkle}
                        />
                    )}
                </div>

                {!loading && stoklar?.content?.length && stoklar?.content?.length > 0 && (
                    <Pagination
                        totalPages={stoklar?.totalPages || 1}
                        handlePageChange={handlePageChange}
                        page={stoklar?.number}
                    />
                )}
            </div>
        </div>
    );
}