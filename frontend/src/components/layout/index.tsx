import { Flex } from "@chakra-ui/react";
import Footer from "./footer";
import Navbar from "./navbar";
import { useTranslations } from "@/hooks/use-translations";
import Head from "next/head";

type ILayoutProps = {
	children: React.ReactNode;
	seoTranslationKey: string;
	seoTranslationVariables?: Record<string, string>;
	plainTitle?: string;
	plainDescription?: string;
	verticalPadding?: boolean;
};

export const Layout = ({
	children,
	seoTranslationKey,
	seoTranslationVariables,
	plainTitle,
	plainDescription,
	verticalPadding = true,
}: ILayoutProps) => {
	const { t } = useTranslations();
	const fullPageTitle = `Mono Repo | ${
		plainTitle || t(`seo.title.${seoTranslationKey}`, seoTranslationVariables)
	}`;
	const description =
		plainDescription ||
		t(`seo.description.${seoTranslationKey}`, seoTranslationVariables);

	return (
		<>
			<Head>
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<meta charSet="utf-8" />
				<meta content={description} name="description" />
				<meta key="ogtitle" content={fullPageTitle} property="og:title" />
				<meta key="ogdesc" content={description} property="og:description" />
				<meta key="twcard" content="summary" name="twitter:card" />

				<meta key="ogimage" content="/splash.jph" property="og:image" />
				<meta key="ogsitename" content="Mono Repo" property="og:site_name" />
				<meta key="ogtitle" content={fullPageTitle} property="og:title" />
				<meta key="ogdesc" content={description} property="og:description" />
				<meta name="theme-color" content="#000000" />
				<title>{fullPageTitle}</title>
			</Head>
			<section>
				<Navbar />
				<Flex
					as="main"
					flexDirection="column"
					minHeight={`calc(100vh - 65px - 105px)`}
					flex={1}
				>
					{children}
				</Flex>
				<Footer />
			</section>
		</>
	);
};
