<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/8/15
 * Time: 10:48 AM
 */

namespace Bux\UserBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class RegistrationFormType
 *
 * @package Bux\UserBundle\Form\Type
 */
class RegistrationFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder->add('fullName', null, array(
            'required'  => true,
            'constraints'   => array(
                new NotBlank()
            )
        ));
        $builder->add('country', 'country', array(
            'required'  => true,
            'constraints'   => array(
                new NotBlank()
            )
        ));
        $builder->add('captcha', 'text', array(
            'constraints'   => array(
                new NotBlank()
            ),
            'mapped'    => false
        ));
        $builder->add('captchaAnswer', 'hidden', array(
            'mapped'    => false,
            'attr'  => array(
                'class' => 'captcha'
            )
        ));
        $builder->add('terms', 'checkbox', array(
            'mapped'    => false,
            'constraints'   => array(
                new NotBlank()
            ),
            'mapped'    => false
        ));
    }

    /**
     * @return string
     */
    public function getParent()
    {
        return 'fos_user_registration';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bux_user_registration';
    }
}