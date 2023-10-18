import dynamic from 'next/dynamic';

const InvoiceAddForm = dynamic(
    () => import("./formComponent"),
    { ssr: false }
);
export const metadata = {
    title: 'Add Invoice',
};

export default function Newinvoice() {
    return (<InvoiceAddForm />)
}