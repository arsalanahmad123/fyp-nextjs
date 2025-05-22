'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link as LinkIcon,
    Image as ImageIcon,
    Copy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type ContentEditorProps = {
    initialContent: string;
    isEditing: boolean;
    contentType: string;
};

const ContentEditor = ({
    initialContent,
    isEditing,
    contentType,
}: ContentEditorProps) => {
    const [isCopying,setIsCopying] = useState(false);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({ levels: [1, 2, 3] }),
            Link.configure({
                openOnClick: false,
                linkOnPaste: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Image.configure({
                inline: true,
                allowBase64: false,
            }),
        ],
        content: initialContent,
        editable: isEditing,
    });

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditing);
        }
    }, [isEditing, editor]);

    const handleSave = async () => {
        if (!editor) return;
        setIsCopying(true)
        try {
            const plainText = editor.getText();
            await navigator.clipboard.writeText(plainText);
            toast.success('Content Copied ...')
            setIsCopying(false);
        } catch (error) {
            console.error('Failed to copy content:', error);
            toast.error('Failed to copy')
            setIsCopying(false);
        }
    };
    

    if (!editor) {
        return (
            <div className="p-4 text-center">
                <p className="text-muted-foreground">Loading editor...</p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'transition-all duration-300',
                isEditing ? 'border-2 border-primary p-4 rounded-md' : ''
            )}
        >
            {isEditing && (
                <div className="mb-4 bg-muted/50 rounded-md p-2 sticky top-0 z-10 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">
                            Editing{' '}
                            {contentType === 'blog-post'
                                ? 'Blog Post'
                                : 'LinkedIn Post'}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleSave}
                                disabled={isCopying}
                                size="sm"
                                className="p-2 text-xs"
                            >
                                <Copy className="h-1 w-1 mr-1" />
                                {isCopying ? 'Copied' : 'Copy'}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('bold')}
                            onPressedChange={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                            aria-label="Bold"
                        >
                            <Bold className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('italic')}
                            onPressedChange={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                            aria-label="Italic"
                        >
                            <Italic className="h-4 w-4" />
                        </Toggle>

                        <Separator
                            orientation="vertical"
                            className="mx-1 h-6"
                        />

                        <Toggle
                            size="sm"
                            pressed={editor.isActive('heading', { level: 1 })}
                            onPressedChange={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 1 })
                                    .run()
                            }
                            aria-label="Heading 1"
                        >
                            <Heading1 className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('heading', { level: 2 })}
                            onPressedChange={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 2 })
                                    .run()
                            }
                            aria-label="Heading 2"
                        >
                            <Heading2 className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('heading', { level: 3 })}
                            onPressedChange={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 3 })
                                    .run()
                            }
                            aria-label="Heading 3"
                        >
                            <Heading3 className="h-4 w-4" />
                        </Toggle>

                        <Separator
                            orientation="vertical"
                            className="mx-1 h-6"
                        />

                        <Toggle
                            size="sm"
                            pressed={editor.isActive('bulletList')}
                            onPressedChange={() =>
                                editor.chain().focus().toggleBulletList().run()
                            }
                            aria-label="Bullet List"
                        >
                            <List className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('orderedList')}
                            onPressedChange={() =>
                                editor.chain().focus().toggleOrderedList().run()
                            }
                            aria-label="Ordered List"
                        >
                            <ListOrdered className="h-4 w-4" />
                        </Toggle>

                        <Separator
                            orientation="vertical"
                            className="mx-1 h-6"
                        />

                        <Toggle
                            size="sm"
                            pressed={editor.isActive({ textAlign: 'left' })}
                            onPressedChange={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign('left')
                                    .run()
                            }
                            aria-label="Align Left"
                        >
                            <AlignLeft className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive({ textAlign: 'center' })}
                            onPressedChange={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign('center')
                                    .run()
                            }
                            aria-label="Align Center"
                        >
                            <AlignCenter className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive({ textAlign: 'right' })}
                            onPressedChange={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign('right')
                                    .run()
                            }
                            aria-label="Align Right"
                        >
                            <AlignRight className="h-4 w-4" />
                        </Toggle>

                        <Separator
                            orientation="vertical"
                            className="mx-1 h-6"
                        />

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                const url = window.prompt('URL');
                                if (url) {
                                    editor
                                        .chain()
                                        .focus()
                                        .setLink({ href: url })
                                        .run();
                                }
                            }}
                            className={cn(
                                'h-8',
                                editor.isActive('link') && 'bg-muted'
                            )}
                        >
                            <LinkIcon className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                const url = window.prompt('Image URL');
                                if (url) {
                                    editor
                                        .chain()
                                        .focus()
                                        .setImage({ src: url })
                                        .run();
                                }
                            }}
                            className="h-8"
                        >
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            <EditorContent
                editor={editor}
                className={cn(
                    'prose max-w-none dark:prose-invert focus:outline-none',
                    isEditing ? 'min-h-[300px] focus-within:outline-none' : '',
                    !isEditing && 'cursor-default'
                )}
            />
        </div>
    );
};

export default ContentEditor;
