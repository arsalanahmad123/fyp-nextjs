'use client';

import ContentEditor from './ContentEditor';
import { IUserGeneratedContent } from '@/models/Content';

interface ContentEditorWrapperProps {
    content: IUserGeneratedContent;
    contentId: string;
}

export default function ContentEditorWrapper({
    content,
}: ContentEditorWrapperProps) {


    return (
        <ContentEditor
            initialContent={content.generatedContent}
            isEditing={true}
            contentType={content.inputMetadata.contentType}
        />
    );
}
