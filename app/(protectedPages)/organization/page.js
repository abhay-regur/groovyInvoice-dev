import dynamic from 'next/dynamic';
const OrganizationSetupForm = dynamic(
    () => import("./formComponent"),
    { ssr: false }
);
export const metadata = {
    title: 'Organization Setup',
}
export default function OrganizationSetup() {
    return (
        <OrganizationSetupForm />
    )
}