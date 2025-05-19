import css from './card.module.scss';
import { useNavigate } from 'react-router-dom';
import { IconRemove } from '../../../shared/icons/remove';

export const Card = (props) => {

    const navigate = useNavigate();

    return (
        <div className={css.card} onClick={() => navigate(`/tasks/${props.id}`)}>
            <span>{props.name}</span>
            <button className={css[`button-close`]} onClick={
                (e) =>
                {
                    props.onRemove(props.id)
                    e.stopPropagation();
                }}>
                <IconRemove/>
            </button>
        </div>
    )
}