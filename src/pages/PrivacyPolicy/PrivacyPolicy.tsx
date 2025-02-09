import "./PrivacyPolicy.scss";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    const today = new Date().toLocaleDateString();

    return (
        <div className="privacy-policy">
            <h1 className="privacy-policy__title">{t("privacy-policy.title")}</h1>
            <p>{t("privacy-policy.effective-date")}{today}</p>

            {[
                "introduction",
                "data-we-collect",
                "use-of-data",
                "storage-and-security",
                "cookies",
                "your-rights",
                "policy-changes",
                "contact",
            ].map((section) => (
                <div key={section}>
                    <h2 className="privacy-policy__subtitle">{t(`privacy-policy.${section}-title`)}</h2>
                    <p>{t(`privacy-policy.${section}`)}</p>

                    {(() => {
                        const items = t(`privacy-policy.${section}-items`, { returnObjects: true });
                        if (items && typeof items === "object") {
                            return (
                                <ul className="list-disc list-inside">
                                    {Object.values(items).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            );
                        }
                        return null;
                    })()}
                </div>
            ))}

            <hr className="my-6 border-gray-600" />
            <p>{t("privacy-policy.acceptance")}</p>
        </div>
    );
};

export default PrivacyPolicy;
