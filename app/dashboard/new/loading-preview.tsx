export function LoadingPreview() {
    return (
        <div className="mt-6 w-full border rounded-lg p-4">
            <div className="mb-2">
                <h2 className="text-lg font-semibold">Generating Content</h2>
                <p className="text-sm text-muted-foreground">
                    Our AI is creating your content...
                </p>
            </div>
            <div className="h-[200px] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-theme)] mx-auto"></div>
                    <p className="mt-4 text-sm text-muted-foreground">
                        This may take a few moments
                    </p>
                </div>
            </div>
        </div>
    );
}
