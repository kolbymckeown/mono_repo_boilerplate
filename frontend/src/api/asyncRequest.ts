import { getCookie } from "@/utils/cookies";

export const REQUEST_METHODS = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
};

type Query = { [key: string]: string };

interface IGetRequestHeaders {
	authToken?: string;
	method?: typeof REQUEST_METHODS[keyof typeof REQUEST_METHODS];
	body?: { [key: string]: any } | null;
}

interface IAsyncRequestOptions extends IGetRequestHeaders {
	query?: Query;
}

function formatQueryString(query?: Query) {
	if (!query) {
		return "";
	}

	return Object.entries(query).reduce((qs, [key, value]) => {
		if (!value) return qs;

		const encodedValue = encodeURI(value);

		return qs ? `${qs}&${key}=${encodedValue}` : `?${key}=${encodedValue}`;
	}, "");
}

const getAuthorizationBearer = (
	authToken?: string
): Record<string, string> | { Authoriziation: string } => {
	if (authToken || getCookie("user_auth_token")) {
		return {
			Authorization: `Bearer ${
				authToken ? authToken : getCookie("user_auth_token")
			}`,
		};
	}

	return {};
};

const getRequestHeaders = ({
	authToken,
	method,
	body,
}: IGetRequestHeaders) => ({
	headers: {
		"Content-Type": "application/json",
		...getAuthorizationBearer(authToken),
	},
	method,
	body: body ? JSON.stringify(body) : null,
});

export async function asyncRequest(
	url: string,
	{
		authToken,
		method = REQUEST_METHODS.GET,
		body = null,
		query = {},
	}: IAsyncRequestOptions = {}
) {
	const queryString = formatQueryString(query);

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}${queryString}`,
		getRequestHeaders({ authToken, method, body })
	);

	const parsedResponse = await response.json();

	if (parsedResponse.statusCode >= 400) {
		throw new Error(
			`Network Error: Status ${parsedResponse.statusCode} ${parsedResponse.message}`
		);
	}

	return parsedResponse;
}
