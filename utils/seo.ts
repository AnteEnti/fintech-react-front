export const updateMetaTags = (title: string, description: string) => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
};
