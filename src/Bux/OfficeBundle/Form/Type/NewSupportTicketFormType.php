<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/9/15
 * Time: 10:52 AM
 */

namespace Bux\OfficeBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class NewSupportTicketFormType
 *
 * @package Bux\OfficeBundle\Form\Type
 */
class NewSupportTicketFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('subject', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
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
            'data_class' => 'Bux\OfficeBundle\Entity\SupportTicket',
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