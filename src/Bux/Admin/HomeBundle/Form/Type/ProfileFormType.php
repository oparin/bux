<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/25/14
 * Time: 10:56 AM
 */

namespace Bux\Admin\HomeBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class ProfileFormType
 *
 * @package Bux\Admin\HomeBundle\Form\Type
 */
class ProfileFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('user', new UserFormType(), array(
            ))
            ->add('personalNotes', 'textarea', array(
                'required'  => false,
            ))
            ->add('supportSignature', 'textarea', array(
                'required'  => false,
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\HomeBundle\Entity\AdminSettings',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'admin_home_profile_form_type';
    }
}