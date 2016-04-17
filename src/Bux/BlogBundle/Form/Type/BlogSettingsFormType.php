<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/13/15
 * Time: 10:59 AM
 */

namespace Bux\BlogBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class BlogSettingsFormType
 *
 * @package Bux\BlogBundle\Form\Type
 */
class BlogSettingsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('avatarFile', 'file', array(
                'required'  => false
            ))
            ->add('headerFile', 'file', array(
                'required'  => false
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\BlogBundle\Entity\BlogUserSettings',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'blog_settings_form_type';
    }
}