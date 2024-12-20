import IconDelete from '../../assets/images/icon-delete.svg';
import IconEdit from '../../assets/images/icon-edit.svg';
import { IconImage } from '../Login/Image';
import { Paragraph } from "./Paragraph";
import { useDeleteComment } from '../../service/useQueries';
import { InputButton } from '../Input';
import { useState } from 'react';

export const Actions = ({ commentId, setIsEditing, isEditing }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { mutate: deleteComment } = useDeleteComment();

    const handleDelete = (e) => {
        e.preventDefault();

        try {
            deleteComment({ id: commentId });
        } catch (error) {
            console.log(error);
        }
    }

    const confirmation = () => {
        return (
            <div>
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-40"></div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-7/12 rounded-md p-6 md:max-w-96">
                    <h1 className='text-2xl text-dark-blue font-bold'>Delete comment</h1>
                    <Paragraph
                        content={"Are you sure you want to delete this comment? This will remove the comment and can't be undone."}
                        className={'my-4'}
                    />
                    <form className='flex' onSubmit={handleDelete}>
                        <InputButton
                            type='button'
                            value='No, Cancel'
                            className='cancel uppercase font-semibold w-[40%]'
                            onClick={() => setShowConfirmation(false)}
                        />
                        <InputButton
                            type='submit'
                            value='Yes, Delete'
                            className='bg-soft-red ml-auto uppercase font-semibold w-[40%]'
                        />
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className='flex items-center'>
            <div className='flex cursor-pointer items-center hover:opacity-45 transition' onClick={() => setShowConfirmation(true)}>
                <IconImage image={IconDelete} />
                <Paragraph className='text-soft-red font-semibold mx-2 my-0' content={'Delete'} />
            </div>

            {showConfirmation && confirmation()}

            <div className='flex cursor-pointer items-center hover:opacity-45 transition' onClick={() => setIsEditing(!isEditing)}>
                <IconImage image={IconEdit} />
                <Paragraph className='text-moderate-blue font-semibold ml-2 my-0' content={'Edit'} />
            </div>
        </div>
    );
}
