'use client';

import { useEffect } from 'react';
import Pagination from '@/app/_components/Pagination';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/features/store';
import { getIsEmirleri } from '@/app/lib/features/isEmirleri/isEmirleriCreateAsyncThunk';
import ButtonEkle from '@/app/_components/general/ButtonEkle';
import SearchText from '@/app/_components/general/SearchText';
import IsEmriTable from './IsEmriTable';

export default function IsEmriList() {

    const dispatch = useDispatch<AppDispatch>();
    const { isEmirleri, loading, status, responseMessage, mySearchText } = useSelector((state: RootState) => state.isEmirleriReducer);

    useEffect(() => {
        dispatch(getIsEmirleri({ pageNum: 0, sortField: "isEmirNo", sortDir: "desc", keyword: mySearchText }));
    }, []);

    const handlePageChange = (newPage: number) => {
        dispatch(getIsEmirleri({ pageNum: newPage , sortField: "isEmirNo", sortDir: "desc", keyword: mySearchText }));
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <ButtonEkle
                        title="İş Emirleri"
                        subTitle="Sistemde kayıtlı tüm iş emirlerini yönetin"
                        href='/dashboard/arac-islemleri'
                        buttonText="Yeni İş Emir Ekle"
                    />
                    <SearchText
                        page={isEmirleri?.number ?? 0}
                        placeholder="İş Emir No, Müşteri Adı, Arac..."
                        searchTable="isEmirleri"
                    />
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">İş emirleri yükleniyor...</p>
                        </div>
                    ) : isEmirleri?.content.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600">İş emirleri bulunamadı.</p>
                        </div>
                    ) : (
                        <IsEmriTable />
                    )}
                </div>

                {!loading && isEmirleri?.content?.length && isEmirleri?.content?.length > 0 && (
                    <Pagination
                        totalPages={isEmirleri?.totalPages || 1}
                        handlePageChange={handlePageChange}
                        page={isEmirleri?.number}
                    />
                )}
            </div>
        </div>
    );
}