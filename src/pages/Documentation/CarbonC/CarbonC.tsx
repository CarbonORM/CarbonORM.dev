import FetchMarkdownWithGrid from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdownWithGrid";

export const CARBON_C: string = 'CarbonC/';

export default function CarbonC() {
    return <FetchMarkdownWithGrid url={'https://raw.githubusercontent.com/CarbonORM/CarbonC/main/README.md'}/>
}
