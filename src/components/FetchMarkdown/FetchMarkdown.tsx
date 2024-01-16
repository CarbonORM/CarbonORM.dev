import CodeBlock from "pages/UI/MaterialUI/components/CodeBlock/CodeBlock";
import {FloatProperty} from "csstype";
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm'

interface iFetchMarkdownCache {
    markdown: string,
    editUrl: string,
    viewUrl: string,
    repoPath?: string,
}

let fullMarkdownCache: {
    [url: string]: iFetchMarkdownCache
} = {};



const rawFileRegex = /^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/(.+)$/i;

// ex - https://raw.githubusercontent.com/wiki/CarbonORM/CarbonORM.dev/Home.md
const rawWikiRegex = /^https:\/\/raw\.githubusercontent\.com\/wiki\/([^/]+)\/([^/]+)\/(.+).md$/i;

function githubRawBlobToEditForm(url: string) {
    return url.startsWith('https://raw.githubusercontent.com/wiki/')
        ? url.replace(rawWikiRegex, 'https://github.com/$1/$2/wiki/$3/_edit')
        : url.replace(rawFileRegex, 'https://github.com/$1/$2/edit/$3');
}

function githubRawBlobToView(url: string) {
    return url.startsWith('https://raw.githubusercontent.com/wiki/')
        ? url.replace(rawWikiRegex, 'https://github.com/$1/$2/wiki/$3')
        : url.replace(rawFileRegex, 'https://github.com/$1/$2/blob/$3');
}

function githubRawBlobToRepoPath(url: string) {
    return url.startsWith('https://raw.githubusercontent.com/wiki/')
        ? url.replace(rawWikiRegex, '$1/$2/wiki/$3')
        : url.replace(rawFileRegex, '$1/$2/$3');
}


export interface iFetchMarkdown {
    url: string
}

export default function FetchMarkdown({url}: iFetchMarkdown) {

    const [markdownCache, setMarkdownCache] = useState<iFetchMarkdownCache>(fullMarkdownCache[url] ?? undefined);

    useEffect(() => {

        if (undefined === fullMarkdownCache[url]) {

            (async () => {

                const myRequest = new Request(url);
                fetch(myRequest)
                    .then((response) => response.text())
                    .then((text) => {
                        const cache: iFetchMarkdownCache = {
                            markdown: text,
                            editUrl: githubRawBlobToEditForm(url),
                            viewUrl: githubRawBlobToView(url),
                            repoPath: githubRawBlobToRepoPath(url),
                        }
                        setMarkdownCache(cache);    // state is needed so the component will re-render
                        fullMarkdownCache[url] = cache;
                    });

            })()

        }

    }, [])

    if (markdownCache === undefined) {
        return <small>LOADING ({url})...</small>
    }

    const editPage = ({text, float = 'inherit'}: { text: string, float?: FloatProperty }) => <small
        style={{float: float}}>
        {text + ' '}
        <a target='_blank' rel='noreferrer' href={markdownCache.editUrl}>
            Edit this page here!
        </a>
        <br/>
        <a target='_blank' rel='noreferrer' href={markdownCache.viewUrl}>{markdownCache?.repoPath}</a>
    </small>

    return <div style={{overflow: "none"}}>
        {undefined === markdownCache.editUrl
            ? null
            : editPage({text: 'See an issues below?'})}
        <ReactMarkdown
            skipHtml={false}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
                code({children, className, node, ...rest}) {

                    const match = /language-(\w+)/.exec(className || '')

                    const code = String(children).replace(/\n$/, '');

                    console.log([match, code.split('\n').length, node, rest]);

                    const language = match ? match[1] : 'text';

                    return 'text' === language
                        ? <code {...rest} className={className} style={{
                            padding: ".2em .4em",
                            margin: 0,
                            fontSize: "85%",
                            whiteSpace: "break-spaces",
                            color: "rgb(248, 248, 242)",
                            backgroundColor: "rgb(40, 42, 54)",
                            borderRadius: "6px"
                        }}>
                            {children}
                        </code>
                        : CodeBlock(code, '', language)
                },
            }}>
            {markdownCache.markdown ?? `Error loading (${url})...`}
        </ReactMarkdown>
        <br/>
        {undefined === markdownCache.editUrl
            ? null
            : editPage({text: 'See issues above?', float: 'right'})}
    </div>
}