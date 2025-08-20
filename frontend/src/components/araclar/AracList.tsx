'use client';

import { useEffect } from 'react';
import Pagination from '@/app/_components/Pagination';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/features/store';
import { getAraclar } from '@/app/lib/features/araclar/araclarCreateAsyncThunk';
import AracTable from './AracTable';
import SearchText from '@/app/_components/general/SearchText';
import ButtonEkle from '@/app/_components/general/ButtonEkle';


function AracList() {

    const dispatch = useDispatch<AppDispatch>();
    const { araclar, loading, status, responseMessage, mySearchText } = useSelector((state: RootState) => state.araclarReducer);

    useEffect(() => {
        dispatch(getAraclar({ pageNum: 0, sortField: "model", sortDir: "desc", keyword: mySearchText }));
    }, []);

    const handlePageChange = (newPage: number) => {
        dispatch(getAraclar({ pageNum: newPage, sortField: "model", sortDir: "desc", keyword: mySearchText }));
    };
    console.log("araclar:::", araclar);
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <ButtonEkle
                        title="Araçlar"
                        subTitle="Sistemde kayıtlı tüm araçları yönetin"
                        href='/dashboard/arac-islemleri/arac-ekle/yeni'
                        buttonText="Yeni Araç Ekle"
                    />
                    <SearchText
                        page={araclar?.number ?? 0}
                        placeholder="Plaka, Şase No, Marka, Müşteri..."
                        searchTable="araclar"
                    />
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Araçlar yükleniyor...</p>
                        </div>
                    ) : araclar?.content.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600">Araç bulunamadı.</p>
                        </div>
                    ) : (
                        <AracTable />
                    )}
                </div>

                {!loading && araclar?.content?.length && araclar?.content?.length > 0 && (
                    <Pagination
                        totalPages={araclar?.totalPages || 1}
                        handlePageChange={handlePageChange}
                        page={araclar?.number}
                    />
                )}
            </div>
        </div>
    );
}

export default AracList;