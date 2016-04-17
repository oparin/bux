<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/27/15
 * Time: 12:39 PM
 */

namespace Bux\HomeBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class ContactFormType
 *
 * @package Bux\HomeBundle\Form\Type
 */
class ContactFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', 'email', array(

            ))
            ->add('text', 'textarea', array(
                'constraints' => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'contact_form_type';
    }
}