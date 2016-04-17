<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/8/15
 * Time: 5:24 PM
 */

namespace Bux\OfficeBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class TicketIdFormType
 *
 * @package Bux\OfficeBundle\Form\Type
 */
class TicketIdFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('ticketId', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ticket_id_form_type';
    }
}