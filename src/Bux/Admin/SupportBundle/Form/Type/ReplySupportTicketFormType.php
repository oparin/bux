<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/9/15
 * Time: 4:29 PM
 */

namespace Bux\Admin\SupportBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class ReplySupportTicketFormType
 *
 * @package Bux\Admin\SupportBundle\Form\Type
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
            ))
            ->add('closed', 'checkbox', array(
                'required'  => false,
                'mapped'    => false,
                'label'     => 'Close this ticket after reply'
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
        return 'new_support_status_form_type';
    }
}