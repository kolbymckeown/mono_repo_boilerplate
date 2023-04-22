import { Layout } from "@/components/layout";
import { useTranslations } from "@/hooks/use-translations";

export default function Home() {
	const { t } = useTranslations();

	return (
		<Layout>
			<span>{t("test")}</span>
			<div>hello</div>
		</Layout>
	);
}
