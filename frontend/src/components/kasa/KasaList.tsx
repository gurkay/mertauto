'use client';

import { useEffect } from 'react';
import Pagination from '@/app/_components/Pagination';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/features/store';
import { getStoklar } from '@/app/lib/features/stoklar/stoklarCreateAsyncThunk';
import StokTable from './KasaTable';
import ButtonEkle from '@/app/_components/general/ButtonEkle';
import SearchText from '@/app/_components/general/SearchText';

export default function KasaList() {

    const dispatch = useDispatch<AppDispatch>();
    const { stoklar, loading, status, responseMessage, mySearchText } = useSelector((state: RootState) => state.stoklarReducer);

    useEffect(() => {
        dispatch(getStoklar({ pageNum: 0, sortField: "stokAdi", sortDir: "desc", keyword: mySearchText }));
    }, []);

    const handlePageChange = (newPage: number) => {
        dispatch(getStoklar({ pageNum: newPage , sortField: "stokAdi", sortDir: "desc", keyword: mySearchText }));
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <ButtonEkle
                        title="Stoklar"
                        subTitle="Sistemde kayıtlı tüm stokları yönetin"
                        href='/dashboard/stocks/stock-crud/new/0'
                        buttonText="Yeni Stok Ekle"
                    />
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
                        <StokTable />
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