import { findVerificationTokenByToken } from '@/actions/find-verification-token';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { verifyCredentialsEmail } from '@/actions/verify-credentials-email';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';

type SearchParams = {
    token?: string;
};

export default async function VerifyEmail({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { token } = await searchParams;

    if (!token) {
        return <InvalidTokenState />;
    }

    const verificationToken = await findVerificationTokenByToken(token);

    if (!verificationToken) {
        return <InvalidTokenState />;
    }

    const isExpired = new Date() > new Date(verificationToken.expires);
    if (isExpired) {
        return <InvalidTokenState />;
    }

    const res = await verifyCredentialsEmail(token);

    if (!res.success) {
        return <InvalidTokenState />;
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold md:text-4xl">
                        Email Verified
                    </CardTitle>
                    <CardDescription>
                        Your email has been successfully verified
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="mb-4">You can now sign in to your account</p>
                    <Button asChild className="w-full bg-theme">
                        <Link href="/signin">Sign In</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

const InvalidTokenState = () => {
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <XCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold md:text-4xl">
                        Invalid Token
                    </CardTitle>
                    <CardDescription>
                        The verification link is invalid or has expired
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="mb-4">
                        Please request a new verification link
                    </p>
                    <Button asChild className="w-full bg-theme">
                        <Link href="/">Return to Homepage</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};
