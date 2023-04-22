import { useCallback } from "react";

import { useRouter } from "next/router";

import { LANGUAGES } from "@/hooks/translations";
import {
	objectPath,
	templateString,
	VARIABLE_STRING_REGEX,
} from "@/utils/string";

export function useTranslations() {
	const { locale } = useRouter();

	const t = useCallback(
		// @ts-ignore
		(path, variables?) => {
			// @ts-ignore
			const selectedLanguage = LANGUAGES[locale];
			let translation = objectPath(path.split("."), selectedLanguage);

			if (!translation) {
				// throw new Error(`Translation at path ${path} not found`);
				return path;
			}

			const hasVariables = VARIABLE_STRING_REGEX.test(translation);
			if (hasVariables && !variables) {
				throw new Error("Translation template string has missing variables");
			}
			if (variables) {
				translation = templateString(translation, variables);
			}

			return translation;
		},
		[locale]
	);

	return { t };
}
