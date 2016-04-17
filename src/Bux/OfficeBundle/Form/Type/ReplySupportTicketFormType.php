<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/10/15
 * Time: 12:43 PM
 */

namespace Bux\OfficeBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class ReplySupportTicketFormType
 *
 * @package Bux\OfficeBundle\Form\Type
 */
class ReplySupportTicketFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('text', 'textarea', array(
                'constraints' => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\OfficeBundle\Entity\ReplySupportTicket',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'reply_support_ticket_form_type';
    }
}