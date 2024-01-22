import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@/styles/breadcrumb.module.scss';

export default function Breadcrumb() {
    const pathname = usePathname();
    const [breadcrumb, setBreadcrumb] = useState([]);

    useEffect(() => {
        const asPathWithoutQuery = pathname.split("?")[0];
        const asPathNestedRoutes = asPathWithoutQuery.split("/").filter(v => v.length > 0);
        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
            const title = subpath.charAt(0).toUpperCase() + subpath.slice(1);
            return { href, title };
        })
        setBreadcrumb([{ href: "/", title: "Home" }, ...crumblist]);
    }, [])


    return (
        <div className={`${styles.breadcrumbMainNav}`}>
            <ol className="breadcrumbs ps-0">
                {
                    breadcrumb.map((crumb, idx) => {
                        if (idx != (breadcrumb.length - 1) && crumb.title != 'Update') {
                            return <li key={idx} className={`${styles.breadcrumbItem} breadcrumb_item`}><a href={crumb.href}>{crumb.title}</a></li>
                        } else {
                            return <li key={idx} className={`${styles.breadcrumbItem} ${styles.currentPageWrapper} breadcrumb_item`}><span className={`${styles.currentPage}`}>{crumb.title}</span></li>
                        }
                    })
                }
            </ol>
        </div>
    )
}