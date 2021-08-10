import ForgeUI, { render, Fragment, Text, IssuePanel, useProductContext, useState } from '@forge/ui';

import api, {route} from "@forge/api"

const fetchCommentsForIssue = async (issueId) => {
    const res = await api
        .asUser()
        .requestJira(route`/rest/api/3/issue/${issueId}/comment`);

    const data = await res.json();
    return data.comments;
}

const FirstComment = () => {
    const context = useProductContext();

    const [comments] = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));

    console.log("this is not the div you are looking for");

    if (comments.length > 0) {
        return (
            <Text>First Comment by: {comments[0].author.displayName} Your comment count: {comments.filter(comment => comment.author.accountId == context.accountId).length}</Text>
        );
    } else {
        return (
            <Text>No comments yet.</Text>
        );
    }
};

const App = () => {

    return (
        <Fragment>
            <Text>Hello world!</Text>
            <FirstComment />
        </Fragment>
    );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
